using System;
using System.Collections.Generic;
using System.Text;

namespace Checklist.Data.Dtos
{
    public class CheckListDto
    {
        public int Id { get; set; }
        public string HubName { get; set; }
        public string Heading { get; set; }
        public int HeadingId { get; set; }
        public bool IsActive { get; set; }
        public int SubAdminId { get; set; }
    }
}
