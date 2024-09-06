using DoctorAppoitmentAPICRUD.Dtos;
using DoctorAppoitmentAPICRUD.Models;

namespace DoctorAppoitmentAPICRUD.Repositories
{
    public interface IDoctorRepository
    {
        Task<IEnumerable<Doctor>> GetAllAsync();
        Task<DoctorGetById> GetByIdAsync(int id);
        Task<Doctor> AddAsync(DoctorRegisterDto doctorRegisterDto);
        Task<Doctor> UpdateAsync(DoctorRegisterDto doctorRegisterDto, int id);
        Task<bool> DeleteAsync(int id);

    }
}
