using System;
using dashboard.Models;

namespace vue_core_dashboard.Controllers.Resources
{
    public class VehicleResource
    {
        
        public int Id { get; set; } 

        public int MakeId { get; set; }
        
        public string Feature { get; set; }
        public bool IsRegistered { get; set; }
        
        public string ContactName { get; set; }    
        public string ContactEmail { get; set; }
      
        public string ContactPhone { get; set; }
       
        public DateTime LastUpdate { get; set; }
    }
}