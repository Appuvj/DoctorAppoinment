using DoctorAppoitmentAPICRUD.Dtos;
using DoctorAppoitmentAPICRUD.Models;

namespace DoctorAppoitmentAPICRUD.Repositories
{
    public interface IBookingRepository
    {
        Task<IEnumerable<BookingGetDto>> GetAllAsync();
        Task<BookingGetDto> GetByIdAsync(int id);
        Task<Booking> AddAsync(BookingDto bookingDto);
        Task<Booking> UpdateAsync(BookingDto bookingDto, int id);
        Task<bool> DeleteAsync(int id);
    }
}
