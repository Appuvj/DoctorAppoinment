using DoctorAppoitmentAPICRUD.Data;
using DoctorAppoitmentAPICRUD.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoctorAppoitmentAPICRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles ="Admin")]


    public class AdminController : ControllerBase
    {

        private readonly HospitalContext _context;

        public AdminController(HospitalContext context)
        {
            _context = context;
        }

        [HttpGet("dashboard-stats")]
        public async Task<IActionResult> GetDashboardStats()
        {
            var patientsCount = await _context.Patients.CountAsync();
            var doctorsCount = await _context.Doctors.CountAsync();
            

            var pendingAppointments = await _context.Bookings.CountAsync(b => b.Status == "pending" && b.Doctor!=null && b.Patient!=null);
            var bookedAppointments = await _context.Bookings.CountAsync(b => b.Status == "booked" && b.Doctor != null && b.Patient != null);
            var completedAppointments = await _context.Bookings.CountAsync(b => b.Status == "completed" && b.Doctor != null && b.Patient != null);
            var totalAppointments = pendingAppointments + bookedAppointments + completedAppointments;
            var stats = new
            {
                PatientsCount = patientsCount,
                DoctorsCount = doctorsCount,
                TotalAppointments = totalAppointments,
                PendingAppointments = pendingAppointments,
                BookedAppointments = bookedAppointments,
                CompletedAppointments = completedAppointments
            };

            return Ok(stats);
        }



        [HttpGet("contact-form")]
        public async Task<IActionResult> GetContactForms()
        {
            var contactForms = await _context.ContactForms.ToListAsync();
            return Ok(contactForms);
        }

        [HttpPut("contact-form/{id}")]
        public async Task<IActionResult> MarkAsRead(int id,ContactForm contactForms)
        {
            var contactForm = await _context.ContactForms.FindAsync(id);

            if (contactForm == null)
            {
                return NotFound();
            }

            // Mark the contact form as read
            contactForm.IsRead = true; // Assuming there is an 'IsRead' field in your ContactForm model
            await _context.SaveChangesAsync();

            return Ok(new { message = "Contact form marked as read" });
        }

    }
}
