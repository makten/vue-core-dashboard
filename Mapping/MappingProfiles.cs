using AutoMapper;
using dashboard.Controllers.Resources;
using dashboard.Models;
using vue_core_dashboard.Controllers.Resources;
using vue_core_dashboard.Models;

namespace dashboard.Mapping
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Feature, FeatureResource>();
            CreateMap<Vehicle, VehicleResource>();
        }
    }
}