using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using dashboard.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vue_core_dashboard.Controllers.Resources;
using vue_core_dashboard.Models;

namespace vue_core_dashboard.Controllers
{
    public class VehiclesController : Controller
    {
        private readonly DashboardDbContext context;
        private readonly IMapper mapper;
        public VehiclesController(DashboardDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;

        }

        [HttpGet("api/vehicles")]
        public async Task<IEnumerable<VehicleResource>> GetVehicles()
        {
            var vehicles = await context.Vehicles.Include(m => m.Make).ToListAsync();

            return mapper.Map<List<Vehicle>, List<VehicleResource>>(vehicles);
        }


        [HttpPost("api/vehicles")]
        public IActionResult Create([FromBody] Vehicle vehicle)
        {
            // if(ModelState.IsValid)
            //     var test = context.
            return Json(vehicle);
        }
    }
}