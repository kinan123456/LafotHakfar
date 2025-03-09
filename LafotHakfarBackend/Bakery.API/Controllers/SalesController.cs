using LafotHakfarBackend.Bakery.Application.Services;
using LafotHakfarBackend.Bakery.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace LafotHakfarBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly SalesService _salesService;

        public SalesController(SalesService salesService)
        {
            _salesService = salesService;
        }

        [HttpGet("GetSaleRecordsHistory")]
        public IActionResult GetSaleRecordsHistory()
        {
            return Ok(_salesService.GetSaleRecordsHistory());
        }

        [HttpPost("SaveNewSaleRecord")]
        public IActionResult SaveNewSaleRecord([FromBody] Sale sale)
        {
            _salesService.SaveNewSaleRecord(sale);
            return Ok(new { message = "Sale recorded successfully." });
        }
    }
}
