using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ToDoProjectDal.Entities;

namespace ToDoProjectDal.Context
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Account> Accounts { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Account>().HasKey(s => s.Id);

            builder.Entity<Account>().HasIndex(s => s.Id).IsUnique();

            builder.Entity<ToDoCard>().HasKey(s => s.Id);

            builder.Entity<ToDoCard>().HasIndex(s => s.Id).IsUnique();
        }
    }
}
