using DoctorAppoitmentAPICRUD.Dtos;
using DoctorAppoitmentAPICRUD.Models;

namespace DoctorAppoitmentAPICRUD.Repositories
{
    public interface IDoctorRepository
    {
        Task<IEnumerable<Doctor>> GetAllAsync();
        Task<Doctor> GetByIdAsync(int id);
        Task<Doctor> AddAsync(DoctorDto doctorDto);
        Task<Doctor> UpdateAsync(DoctorDto doctorDto, int id);
        Task<bool> DeleteAsync(int id);

    }
}
