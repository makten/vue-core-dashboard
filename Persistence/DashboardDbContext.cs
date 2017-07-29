using dashboard.Models;
using Microsoft.EntityFrameworkCore;

namespace dashboard.Persistence
{
    public class DashboardDbContext : DbContext
    {
        public DashboardDbContext(DbContextOptions<DashboardDbContext> options)
            :base(options)
        {
            
        }

        //Only add models that are to be queried or have no relations
        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }

    }
}