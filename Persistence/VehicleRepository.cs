using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dashboard.Core.Models;
using dashboard.Core;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System;
using dashboard.Extensions;

namespace dashboard.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly DashboardDbContext context;

        public VehicleRepository(DashboardDbContext context)
        {
            this.context = context;

        }


        public async Task<IEnumerable<Vehicle>> GetVehicles(VehicleQuery queryObj)
        {
            //Without query
            // return await context.Vehicles
            //               .Include(v => v.Features)
            //                   .ThenInclude(vf => vf.Feature) // Eager load features
            //               .Include(v => v.Model)
            //                   .ThenInclude(m => m.Make)
            //               .ToListAsync();

            //Query filter
            var query = context.Vehicles
                          .Include(v => v.Features)
                              .ThenInclude(vf => vf.Feature) // Eager load features
                          .Include(v => v.Model)
                              .ThenInclude(m => m.Make)
                          .AsQueryable();

            if(queryObj.MakeId.HasValue)
                query = query.Where(v => v.Model.MakeId == queryObj.MakeId);
            
            if(queryObj.ModelId.HasValue)
                query = query.Where(v => v.Model.Id == queryObj.ModelId);

            // Create a dictionary of LINQ expressions
            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>(){
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.ContactName,                
            };

            query = query.ApplyOrdering(queryObj, columnsMap);  

            query = query.ApplyPagination(queryObj);

            return await query.ToListAsync();
        }

        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Vehicles.FindAsync(id);

            return await context.Vehicles
                          .Include(v => v.Features)
                              .ThenInclude(vf => vf.Feature) // Eager load features
                          .Include(v => v.Model)
                              .ThenInclude(m => m.Make)
                          .SingleOrDefaultAsync(v => v.Id == id);
        }

        public void Add(Vehicle vehicle)
        {
            context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            context.Remove(vehicle);
        }

        
    }
}