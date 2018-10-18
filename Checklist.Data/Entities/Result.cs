using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Checklist.Data.Entities
{
    public class Result
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public EmployementType EmployementType { get; set; }
        public string HRMS { get; set; }
        public string CompanyName { get; set; }
        public string Remarks { get; set; }
        public string SignatureBase64 { get; set; }


        public int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User Users { get; set; }

        public int CheckListId { get; set; }
        [ForeignKey(nameof(CheckListId))]
        public virtual CheckList CheckList { get; set; }

        public DateTime SubmitOn { get; set; }
    }

    public enum EmployementType
    {
        PermanentStaff = 1,
        Contractor= 2
    }
}
