using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dashboard.Core.Models;
using dashboard.Core;
using System.Collections.Generic;
using System.Linq;

namespace dashboard.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly DashboardDbContext context;

        public VehicleRepository(DashboardDbContext context)
        {
            this.context = context;

        }


        public async Task<IEnumerable<Vehicle>> GetVehicles(Filter filter)
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

            if(filter.MakeId.HasValue)
                query = query.Where(v => v.Model.MakeId == filter.MakeId);
            
            if(filter.ModelId.HasValue)
                query = query.Where(v => v.Model.Id == filter.ModelId);
            
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