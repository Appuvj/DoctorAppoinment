using DoctorAppoitmentAPICRUD.Models;
using Microsoft.EntityFrameworkCore;

namespace DoctorAppoitmentAPICRUD.Data
{
    public class HospitalContext : DbContext
    {

        public HospitalContext(DbContextOptions<HospitalContext> options) : base(options)
        {

        }


        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<ContactForm> ContactForms { get; set; } 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Doctor)
                .WithMany(d => d.Bookings)
                .HasForeignKey(b => b.DoctorId)
                .OnDelete(DeleteBehavior.SetNull); // Set null on delete

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Patient)
                .WithMany(p => p.Bookings)
                .HasForeignKey(b => b.PatientId)
                .OnDelete(DeleteBehavior.SetNull); // Set null on delete

            modelBuilder.Entity<Doctor>()
                .HasIndex(d => d.Email)
                .IsUnique(); // Enforce unique constraint on Email

            modelBuilder.Entity<Patient>()
                .HasIndex(d => d.Email)
                .IsUnique(); // Enforce unique constraint on Email


        }
    }
}
