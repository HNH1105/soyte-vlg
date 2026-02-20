"use client";

import { useEffect, useState, useMemo } from "react";
import { VendexHeaderWithUserDropdown } from "~/app/zapply-components/menu";
import FooterSection from "~/app/zapply-components/footer";

type ChuyenXe = {
  maCT: string;
  batDau: string;
  ketThuc: string;
  ketThucThucTe: string;
  diaDiem: string;
  noiDung: string;
  nguoiDi: string;
  donVi: string;
  xe: string;
  taiXe: string;
  nguoiPhanCong: string;
  trangThai: string;
  ghiChu: string;
};

const SHEET_JSON_URL =
  "https://opensheet.elk.sh/1aMzdlld3K7F9z2kv1dCqZm8uVfIQjsRQ0AkvguKmJig/Sheet1";


// ===== LẤY NGÀY HÔM NAY THEO GIỜ LOCAL =====
function getTodayLocal() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60000);
  return local.toISOString().split("T")[0];
}


// ===== PARSE NGÀY DD/MM/YYYY HH:mm =====
function parseVNDate(str: string) {
  if (!str) return null;

  const [datePart, timePart = "00:00"] = str.split(" ");
  const [d, m, y] = datePart.split("/").map(Number);
  const [hh = 0, mm = 0] = timePart.split(":").map(Number);

  return new Date(y, m - 1, d, hh, mm);
}


// ===== CHECK CHUYẾN XE CÓ NẰM TRONG NGÀY =====
function isTripInDay(startStr: string, endStr: string, selectedDate: string) {
  const start = parseVNDate(startStr);
  const end = parseVNDate(endStr);

  if (!start || !end) return false;

  const dayStart = new Date(selectedDate + "T00:00:00");
  const dayEnd = new Date(selectedDate + "T23:59:59");

  return start <= dayEnd && end >= dayStart;
}


export default function QuanLyXe() {
  const [data, setData] = useState<ChuyenXe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(getTodayLocal());
  const [selectedDriver, setSelectedDriver] = useState("ALL");


  // ===== LOAD GOOGLE SHEET =====
  useEffect(() => {
    fetch(SHEET_JSON_URL)
      .then((res) => res.json())
      .then((rows) => {
        const mapped = rows.map((r: any) => ({
          maCT: r["Mã CT"],
          batDau: r["Thời gian bắt đầu"],
          ketThuc: r["Thời gian kết thúc"],
          ketThucThucTe: r["Thời gian kết thúc thực tế"],
          diaDiem: r["Địa điểm"],
          noiDung: r["Nội dung"],
          nguoiDi: r["Người đi"],
          donVi: r["Đơn vị"],
          xe: r["Xe"],
          taiXe: r["Tài xế"],
          nguoiPhanCong: r["Người phân công"],
          trangThai: r["Trạng thái"],
          ghiChu: r["Ghi chú"],
        }));

        setData(mapped);
        setLoading(false);
      });
  }, []);


  // ===== DANH SÁCH TÀI XẾ UNIQUE =====
  const drivers = useMemo(() => {
    const list = data
      .map((d) => d.taiXe)
      .filter((x) => x && x.trim() !== "");

    return [...new Set(list)];
  }, [data]);


  // ===== FILTER =====
  const filtered = data.filter((trip) => {
    const matchDate = isTripInDay(trip.batDau, trip.ketThuc, selectedDate);
    const matchDriver =
      selectedDriver === "ALL" || trip.taiXe === selectedDriver;

    return matchDate && matchDriver;
  });


  return (
    <>
      <VendexHeaderWithUserDropdown />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow p-6">
          {/* HEADER */}
          <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Quản lý lịch xe công tác
            </h1>

            <div className="flex gap-3">
              {/* DATE */}
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
              {/* DRIVER */}
              <select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="ALL">Tất cả tài xế</option>
                {drivers.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* LOADING */}
          {loading && (
            <div className="text-center py-10 text-gray-500">
              Đang tải dữ liệu...
            </div>
          )}

          {/* EMPTY */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              Không có chuyến xe phù hợp
            </div>
          )}


          {/* TABLE */}
          {!loading && filtered.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Mã CT</th>
                    <th className="px-4 py-3">Thời gian</th>
                    <th className="px-4 py-3">Địa điểm</th>
                    <th className="px-4 py-3">Nội dung</th>
                    <th className="px-4 py-3">Người đi</th>
                    <th className="px-4 py-3">Xe</th>
                    <th className="px-4 py-3">Tài xế</th>
                    <th className="px-4 py-3">Trạng thái</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((trip, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{trip.maCT}</td>

                      <td className="px-4 py-3">
                        <div>{trip.batDau}</div>
                        <div className="text-gray-400 text-xs">
                          → {trip.ketThuc}
                        </div>
                      </td>

                      <td className="px-4 py-3">{trip.diaDiem}</td>
                      <td className="px-4 py-3">{trip.noiDung}</td>
                      <td className="px-4 py-3">{trip.nguoiDi}</td>
                      <td className="px-4 py-3 font-semibold">{trip.xe}</td>
                      <td className="px-4 py-3">{trip.taiXe}</td>

                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                          {trip.trangThai}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>

      <FooterSection />
    </>
  );
}