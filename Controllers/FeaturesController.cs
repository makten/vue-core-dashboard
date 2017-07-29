using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using dashboard.Controllers.Resources;
using dashboard.Models;
using dashboard.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dashboard.Controllers
{
    public class FeaturesController : Controller
    {
        private readonly DashboardDbContext context;
        private readonly IMapper mapper;
        public FeaturesController(DashboardDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;

        }


        [HttpGet("api/features")]
        public async Task<IEnumerable<FeatureResource>> GetFeatures()
        {
            var features = await context.Features.ToListAsync();

            return mapper.Map<List<Feature>, List<FeatureResource>>(features); 
        }
    }
}