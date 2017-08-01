using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dashboard.Core.Models;
using dashboard.Core;
using System.Collections.Generic;

namespace dashboard.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly DashboardDbContext context;

        public VehicleRepository(DashboardDbContext context)
        {
            this.context = context;

        }


        public async Task<List<Vehicle>> GetVehicles()
        {
            return await context.Vehicles
                          .Include(v => v.Features)
                              .ThenInclude(vf => vf.Feature) // Eager load features
                          .Include(v => v.Model)
                              .ThenInclude(m => m.Make)
                          .ToListAsync();
        }

        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if(!includeRelated)
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