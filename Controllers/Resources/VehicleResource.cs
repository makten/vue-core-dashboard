using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using dashboard.Models;
using vue_core_dashboard.Models;

namespace vue_core_dashboard.Controllers.Resources
{

    public class VehicleResource
    {
        
        public int Id { get; set; } 

        public int ModelId { get; set; }
        
        public ICollection<int> Features { get; set; }
        public bool IsRegistered { get; set; }

        public ContactResource Contact { get; set; } 
      

        public VehicleResource()
        {
            Features = new Collection<int>();
        }
    }
}