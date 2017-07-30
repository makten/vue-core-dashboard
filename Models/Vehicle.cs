using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using dashboard.Models;

namespace vue_core_dashboard.Models
{
    [Table("Vehicles")]
    public class Vehicle
    {
        public int Id { get; set; } 

        [Required]
        public Model Make { get; set; }
        public int MakeId { get; set; }
        public string Feature { get; set; }
        public bool IsRegistered { get; set; }

        [Required]
        [StringLength(255)]
        public string ContactName { get; set; }    
        public string ContactEmail { get; set; }

        [Required]
        [StringLength(255)]
        public string ContactPhone { get; set; }

        [Required, DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime LastUpdate { get; set; }

    }
}