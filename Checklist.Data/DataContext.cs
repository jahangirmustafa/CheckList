using System;
using Checklist.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Checklist.WebApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<CheckList> CheckLists { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Heading> Headings { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<Answer> Answers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }

       
    }
}