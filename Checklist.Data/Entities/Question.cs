using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Checklist.Data.Entities
{
    public class Question
    {
        public int Id { get; set; }        
        public string Content { get; set; }
        public string HeaderText { get; set; }
        public string FooterText { get; set; }

        public int? CheckListId { get; set; }
        [ForeignKey(nameof(CheckListId))]
        public virtual CheckList CheckList { get; set; }

        public int? MainHeadingId { get; set; }
        [ForeignKey(nameof(MainHeadingId))]
        public virtual Heading Heading { get; set; }

        public int? SubHeadingId { get; set; }
        [ForeignKey(nameof(SubHeadingId))]
        public virtual Heading SubHeading { get; set; }

        public int? SubOfSubHeadingId { get; set; }
        [ForeignKey(nameof(SubOfSubHeadingId))]
        public virtual Heading SubOfSubHeading { get; set; }

        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public string Option4 { get; set; }
        public string Option5 { get; set; }
        public string Option6 { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
