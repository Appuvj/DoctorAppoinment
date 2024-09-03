using Microsoft.EntityFrameworkCore;

namespace DoctorAppoitmentAPICRUD.Models
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
            return await _context.Bookings.ToListAsync();
        }

        public async Task<Booking> GetByIdAsync(int id)
        {
            return await _context.Bookings.FindAsync(id);
        }

        public async Task<Booking> AddAsync(Booking booking)
        {
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return booking; // Return the added booking
        }

        public async Task<Booking> UpdateAsync(Booking booking)
        {
            _context.Entry(booking).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return booking; // Return the updated booking
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking != null)
            {
                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();
                return true; // Indicate successful deletion
            }
            return false; // Indicate that the booking was not found
        }
    }
}
