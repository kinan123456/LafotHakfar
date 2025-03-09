using LafotHakfarBackend.Bakery.Domain.Models;
using LafotHakfarBackend.Bakery.Infrastructure.FileStorage;
using Microsoft.AspNetCore.Mvc;

namespace LafotHakfarBackend.Bakery.Application.Services
{
    public class SalesService
    {
        private readonly FileStorageService<Sale> _storage;

        public SalesService(FileStorageService<Sale> storage)
        {
            _storage = storage;
        }

        public void SaveNewSaleRecord(Sale sale) => _storage.AddItem(sale);

        public List<Sale> GetSaleRecordsHistory()
        {
            return _storage.ReadAll();
        }
    }
}
