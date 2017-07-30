using System.ComponentModel.DataAnnotations.Schema;
using dashboard.Models;

namespace vue_core_dashboard.Models
{
    [Table("VehicleFeatures")]
    //Workaround for many to many relationship n<->n
    public class VehicleFeature
    {
        public int VehicleId { get; set; }
        public int FeatureId { get; set; }  
        public Vehicle Vehicle { get; set; }
        public Feature Feature { get; set; }

        //Composite property "Fluent API"

    }
}