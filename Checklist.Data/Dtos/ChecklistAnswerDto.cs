using System;
using System.Collections.Generic;
using System.Text;

namespace Checklist.Data.Dtos
{
    public class ChecklistAnswerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string HRMS { get; set; }
        public string CompanyName { get; set; }
        public int EmployementType { get; set; }
        public string Remarks { get; set; }
        public string UserSignature { get; set; }
        public List<AnswerItem> AnswerItems { get; set; }

        public int UserId { get; set; }
        public int CheckListId { get; set; }


        public ChecklistAnswerDto()
        {
            AnswerItems = new List<AnswerItem>();
        }
    }

    public class AnswerItem
    {
        public int Id { get; set; }
        public string Answer { get; set; }
    }
}
