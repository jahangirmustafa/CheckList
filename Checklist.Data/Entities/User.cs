using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Checklist.Data.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        [Required]
        public UserRole Role { get; set; }

        
        public int? UserSubAdminId { get; set; }
        [ForeignKey(nameof(UserSubAdminId))]
        public virtual User Users { get; set; }
    }

    public enum UserRole
    {
        Admin = 1,
        SubAdmin = 2,
        User = 3
    }
}
