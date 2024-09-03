using DoctorAppoitmentAPICRUD.Data;
using DoctorAppoitmentAPICRUD.Dtos;
using DoctorAppoitmentAPICRUD.Models;
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

        public async Task<IEnumerable<Booking>> GetAllAsync()
        {
            return await _context.Bookings
                                 .Include(b => b.Doctor)
                                 .Include(b => b.Patient)
                                 .ToListAsync();
        }

        public async Task<Booking> GetByIdAsync(int id)
        {
            return await _context.Bookings
                                 .Include(b => b.Doctor)
                                 .Include(b => b.Patient)
                                 .FirstOrDefaultAsync(b => b.BookingId == id);
        }

        public async Task<Booking> AddAsync(BookingDto bookingDto)
        {
            var booking = new Booking
            {
                BookingDate = bookingDto.BookingDate,
                Status = bookingDto.Status,
                DoctorId = bookingDto.DoctorId,
                PatientId = bookingDto.PatientId
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
            var booking = await _context.Bookings.FindAsync(id);
            booking.BookingDate = bookingDto.BookingDate;
            booking.Status = bookingDto.Status;
            booking.DoctorId = bookingDto.DoctorId;
            booking.PatientId = bookingDto.PatientId;
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();
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
    }
}
