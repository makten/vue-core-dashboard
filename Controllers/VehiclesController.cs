using System;
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
    //Apply to all routes
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly DashboardDbContext context;
        private readonly IMapper mapper;
        public VehiclesController(DashboardDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;

        }

        // [HttpGet]
        // public async Task<IEnumerable<VehicleResource>> GetVehicles()
        // {
        //     var vehicles = await context.Vehicles.Include(m => m.Model).ToListAsync();

        //     return mapper.Map<List<Vehicle>, List<VehicleResource>>(vehicles);
        // }


        // [HttpPost("/api/vehicles")]
        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] VehicleResource vehicleResource)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            context.Vehicles.Add(vehicle);
            await context.SaveChangesAsync();

           var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }
    }
}