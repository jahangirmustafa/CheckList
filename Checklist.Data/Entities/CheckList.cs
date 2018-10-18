using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Checklist.Data.Entities
{
    public class CheckList
    {
        public int Id { get; set; }
        public string HubName { get; set; }       
        public DateTime CreatedOn { get; set; }
        public bool IsActive { get; set; }

        public int? SubAdminId { get; set; }
        [ForeignKey(nameof(SubAdminId))]
        public virtual User Users { get; set; }
    }
}
