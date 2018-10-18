using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Checklist.Data.Entities
{
    public class Answer
    {
        public int Id { get; set; }
        public string UserAnswer { get; set; }

        public int QuesionId { get; set; }
        [ForeignKey(nameof(QuesionId))]
        public virtual Question Question { get; set; }

        public int ResultId { get; set; }
        [ForeignKey(nameof(ResultId))]
        public virtual Result Result { get; set; }

        public DateTime Created { get; set; }
    }

    public enum AnswerEnum 
    {
        Yes = 1,
        NA = 2        
    }

  
}
