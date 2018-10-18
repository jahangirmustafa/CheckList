using Checklist.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Checklist.Data.Dtos
{
    public class HeadingDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string HeadingType { get; set; }

        public int? CheckListId { get; set; }
        

    }
}
