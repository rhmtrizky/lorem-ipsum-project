import React, { useState, useEffect } from 'react';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [year, setYear] = useState(selectedDate.getFullYear());
  const [month, setMonth] = useState(selectedDate.getMonth());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const lastOfPrevMonth = new Date(year, month, 0);
    const lastOfMonth = new Date(year, month + 1, 0);
    const firstOfNextMonth = new Date(year, month + 1, 1);

    const datesArray = [];

    // Display the last week of previous month
    for (let i = 0; i <= lastOfPrevMonth.getDay(); i++) {
      const text = lastOfPrevMonth.getDate() - lastOfPrevMonth.getDay() + i;
      datesArray.push(
        <button
          key={`prev-${i}`}
          disabled
          className="prev-month"
        >
          {text}
        </button>
      );
    }

    // Display the current month
    for (let i = 1; i <= lastOfMonth.getDate(); i++) {
      const isToday = new Date().getDate() === i && new Date().getFullYear() === year && new Date().getMonth() === month;

      const isSelected = selectedDate.getDate() === i && selectedDate.getFullYear() === year && selectedDate.getMonth() === month;

      datesArray.push(
        <button
          key={`curr-${i}`}
          className={`${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </button>
      );
    }

    // Display the first week of next month
    for (let i = firstOfNextMonth.getDay(); i < 7; i++) {
      const text = i - firstOfNextMonth.getDay() + 1;
      datesArray.push(
        <button
          key={`next-${i}`}
          disabled
          className="next-month"
        >
          {text}
        </button>
      );
    }

    setDates(datesArray);

    return () => {
      setDates([]);
    };
  }, [month, year]);

  const handleDateClick = (day) => {
    setSelectedDate(new Date(year, month, day));
  };

  const handleApply = () => {
    setDatePickerVisible(false);
  };

  const handleNext = () => {
    if (month === 11) setYear(year + 1);
    setMonth((month + 1) % 12);
  };

  const handlePrev = () => {
    if (month === 0) setYear(year - 1);
    setMonth((month - 1 + 12) % 12);
  };

  return (
    <div className="datepicker-container w-full">
      <div className="w-full">
        <label
          form="tanggal-lahir"
          className="mb-2 text-sm sr-only"
        >
          Tanggal Lahir
        </label>
        <p className="text-red-700">Harus diisi</p>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <i className="bx bxs-calendar-alt"></i>
          </div>
          <input
            type="text"
            className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none"
            placeholder="Select Date"
            value={selectedDate.toLocaleDateString('en-us', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
            onChange={(e) => setTanggalLahir(e.target.value)}
            readOnly
          />
        </div>
      </div>

      {isDatePickerVisible && (
        <div className="datepicker">
          <div className="flex items-center datepicker-header">
            <button
              type="button"
              className="font-box-icon"
              onClick={handlePrev}
            >
              <i className="bx bxs-chevron-left"></i>
            </button>
            <div>
              <select
                className="month-input"
                value={month}
                onChange={(e) => setMonth(parseInt(e.target.value))}
              >
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((monthName, index) => (
                  <option
                    key={index}
                    value={index}
                  >
                    {monthName}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="outline-none text-xl"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
              />
            </div>
            <button
              type="button"
              className="font-box-icon"
              onClick={handleNext}
            >
              <i class="bx bxs-chevron-right"></i>
            </button>
          </div>

          <div className="days">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="dates">{dates}</div>

          <div className="datepicker-footer">
            <button
              className="cancel"
              onClick={() => setDatePickerVisible(false)}
            >
              Cancel
            </button>
            <button
              className="apply"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
