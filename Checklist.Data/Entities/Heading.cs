using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Checklist.Data.Entities
{
    public class Heading
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public HeadingType HeadingType { get; set; }

        public int? CheckListId { get; set; }
        [ForeignKey(nameof(CheckListId))]
        public virtual CheckList CheckList { get; set; }

        //public int QuestionId{ get; set; }
        //[ForeignKey(nameof(QuestionId))]
        //public virtual Question Question { get; set; }


    }

    public enum HeadingType
    {
        MainHeading = 1,
        SubHeading = 2,
        SubOfSubHeading = 3
    }
}
