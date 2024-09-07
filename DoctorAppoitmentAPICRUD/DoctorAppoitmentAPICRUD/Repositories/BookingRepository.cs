using DoctorAppoitmentAPICRUD.Data;
using DoctorAppoitmentAPICRUD.Dtos;
using DoctorAppoitmentAPICRUD.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoctorAppoitmentAPICRUD.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly HospitalContext _context;

        public BookingRepository(HospitalContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BookingGetDto>> GetAllAsync()
        {
            var bookings = _context.Bookings
                           .Include(b => b.Doctor)
                           .Include(b => b.Patient)
                           .Select(b => new BookingGetDto
                           {
                               BookingId = b.BookingId,
                               BookingDate = b.BookingDate,
                               Status = b.Status,
                               DoctorName = b.Doctor.Name,
                               PatientName = b.Patient.Name
                           }).ToList();

            return bookings;
        }

        public async Task<BookingGetDto> GetByIdAsync(int id)
        {
            var booking = await _context.Bookings
                       .Include(b => b.Doctor)
                       .Include(b => b.Patient)
                       .Where(b => b.BookingId == id) // Filter by ID
                       .Select(b => new BookingGetDto
                       {
                           BookingId = b.BookingId,
                           BookingDate = b.BookingDate,
                           Status = b.Status,
                           DoctorName = b.Doctor.Name,
                           PatientName = b.Patient.Name
                       })
                       .FirstOrDefaultAsync(); // Get the first (and only) result

            return booking;
        }

        public async Task<Booking> AddAsync(BookingPostDto bookingPostDto)
        {
            var booking = new Booking
            {
                BookingDate = bookingPostDto.BookingDate,
                Status = bookingPostDto.Status,
                DoctorId = bookingPostDto.DoctorId,
                PatientId = bookingPostDto.PatientId
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return await _context.Bookings
                          .Include(b => b.Doctor) // Eager load the Doctor
                          .Include(b => b.Patient) // Eager load the Patient
                          .FirstOrDefaultAsync(b => b.BookingId == booking.BookingId);

        }

        public async Task<Booking> UpdateAsync(BookingDto bookingDto,int id)
        {

            IFormFile image = bookingDto.Prescription;
            byte[] imageBytes;
            using (var memoryStream = new MemoryStream())
            {
                await image.CopyToAsync(memoryStream);
                imageBytes = memoryStream.ToArray();
            }

            //Console.WriteLine(bookingDto.Status+" "+bookingDto.PatientId);
            var booking = await _context.Bookings.FindAsync(id);
         
            booking.Status = bookingDto.Status;
            booking.ImageData = imageBytes;


            Console.WriteLine(booking.BookingId + " "+booking.Status+" "+booking.PatientId+" "+booking.DoctorId);
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();
            _context.Entry(booking).State = EntityState.Detached;

            return booking;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return false;
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
            return true;
        }



        public async Task<ActionResult<IEnumerable<object>>> GetMedicalHistory(int id)
        {
            var completedBookings = await _context.Bookings
                .Where(b => b.PatientId == id && b.Status == "Completed" && b.DoctorId != null && b.PatientId != null)
                .Include(b => b.Doctor)  // Join the Doctor table
                .Include(b => b.Patient) // Join the Patient table
                .Select(b => new
                {
                    DoctorId = b.DoctorId,
                    DoctorName = b.Doctor != null ? b.Doctor.Name : "Unknown", // Check if Doctor exists
                    BookingDate = b.BookingDate,
                    PatientId = b.PatientId,
                    PatientName = b.Patient != null ? b.Patient.Name : "Unknown", // Check if Patient exists
                    Prescription = b.ImageData != null ? Convert.ToBase64String(b.ImageData) : null // Convert prescription to Base64 if exists
                })
                .ToListAsync();

            return completedBookings;
        }
    }
}
