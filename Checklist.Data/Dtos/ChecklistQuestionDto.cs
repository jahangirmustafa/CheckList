using Checklist.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Checklist.Data.Dtos
{
    public class ChecklistQuestionDto
    {
        public int Id { get; set; }
        public string HubName { get; set; }
        public DateTime CreatedOn { get; set; }

        public List<HeadingQuestionDto> HeadingQuestion{ get; set; }
        public List<Question> Questions { get; set; }

        public ChecklistQuestionDto()
        {
            HeadingQuestion = new List<HeadingQuestionDto>();
            Questions = new List<Question>();
        }
    }
     

    public class HeadingQuestionDto
    {
        public Heading MainHeading { get; set; }
        public Heading SubHeading { get; set; }
        public Heading SubOfSubHeading { get; set; }

        public List<Question> Questions { get; set; }
    }



}
