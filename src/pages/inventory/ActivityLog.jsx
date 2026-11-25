
import { useMemo, useState } from "react";
import {
  CalendarDays,
  History,
  Search,
  X,
} from "lucide-react";
import InventoryBar from "../../components/InventoryBar/InventoryBar";
import "../../pages-css/ActivityLog.css";

const initialActivities = [
  {
    id: 1,
    user: "Admin",
    role: "Inventory Manager",
    action: "Updated Stock",
    actionType: "updated",
    module: "Inventory",
    details: "Updated Pork stock from 8 kg to 5 kg.",
    date: "2026-11-25",
    time: "16:35",
  },
  {
    id: 2,
    user: "Admin",
    role: "Inventory Manager",
    action: "Published Review",
    actionType: "published",
    module: "Website Content",
    details: "Published a customer review from Alex M.",
    date: "2026-11-25",
    time: "15:42",
  },
  {
    id: 3,
    user: "Admin",
    role: "Inventory Manager",
    action: "Added Item",
    actionType: "added",
    module: "Inventory",
    details: "Added Cheese to the inventory.",
    date: "2026-11-25",
    time: "14:20",
  },
  {
    id: 4,
    user: "Admin",
    role: "Inventory Manager",
    action: "Updated Article",
    actionType: "updated",
    module: "Website Content",
    details: "Edited the content of an existing promotional article.",
    date: "2026-11-24",
    time: "17:10",
  },
  {
    id: 5,
    user: "Admin",
    role: "Inventory Manager",
    action: "Created Category",
    actionType: "added",
    module: "Inventory",
    details: "Created a new category named Beverages.",
    date: "2026-11-24",
    time: "15:05",
  },
  {
    id: 6,
    user: "Admin",
    role: "Inventory Manager",
    action: "Hidden Review",
    actionType: "hidden",
    module: "Website Content",
    details: "Removed a published customer review from the website.",
    date: "2026-11-23",
    time: "13:45",
  },
  {
    id: 7,
    user: "Admin",
    role: "Inventory Manager",
    action: "Deleted Item",
    actionType: "deleted",
    module: "Inventory",
    details: "Removed an unused item from the inventory.",
    date: "2026-11-23",
    time: "11:30",
  },
  {
    id: 8,
    user: "Admin",
    role: "Inventory Manager",
    action: "Published Article",
    actionType: "published",
    module: "Website Content",
    details: "Published a new article on the promotional website.",
    date: "2026-11-22",
    time: "16:15",
  },
  {
    id: 9,
    user: "Admin",
    role: "Inventory Manager",
    action: "Logged In",
    actionType: "login",
    module: "System",
    details: "Admin successfully logged into the inventory system.",
    date: "2026-11-22",
    time: "08:12",
  },
];

const ActivityLog = () => {
  const [activities] = useState(initialActivities);
  const [searchTerm, setSearchTerm] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All Modules");
  const [selectedDate, setSelectedDate] = useState("");

  const filteredActivities = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return activities
      .filter((activity) => {
        const matchesModule =
          moduleFilter === "All Modules" ||
          activity.module === moduleFilter;

        const matchesDate =
          !selectedDate || activity.date === selectedDate;

        const matchesSearch = [
          activity.user,
          activity.role,
          activity.action,
          activity.module,
          activity.details,
        ].some((value) => value.toLowerCase().includes(search));

        return matchesModule && matchesDate && matchesSearch;
      })
      .sort(
        (first, second) =>
          new Date(`${second.date}T${second.time}`) -
          new Date(`${first.date}T${first.time}`)
      );
  }, [activities, searchTerm, moduleFilter, selectedDate]);

  const formatDate = (date) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}:00`).toLocaleTimeString("en-PH", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const clearFilters = () => {
    setSearchTerm("");
    setModuleFilter("All Modules");
    setSelectedDate("");
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    moduleFilter !== "All Modules" ||
    selectedDate !== "";

  return (
    <div className="system-activity-log-page">
      <InventoryBar activePage="Activity Log" />

      <main className="system-activity-log-main">
        <div className="system-activity-log-container">
          <header className="system-activity-log-header">
            <div>
              <span className="system-activity-log-eyebrow">
                SYSTEM MANAGEMENT
              </span>
              <h1>Activity Log</h1>
              <p>
                Monitor administrative actions and changes made across the
                inventory and website content.
              </p>
            </div>
          </header>

          <section className="system-activity-log-content">
            <div className="system-activity-log-toolbar">
              <div className="system-activity-log-toolbar-title">
                <div className="system-activity-log-title-icon">
                  <History size={19} />
                </div>

                <div>
                  <h2>System Activities</h2>
                  <p>Review the recorded system activities.</p>
                </div>
              </div>

              <div className="system-activity-log-filters">
                <div className="system-activity-log-search">
                  <Search size={17} />
                  <input
                    type="text"
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>

                <select
                  className="system-activity-log-module-select"
                  value={moduleFilter}
                  onChange={(event) => setModuleFilter(event.target.value)}
                  aria-label="Filter activities by module"
                >
                  <option value="All Modules">All Modules</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Website Content">Website Content</option>
                  <option value="System">System</option>
                </select>

                <div className="system-activity-log-date-filter">
                  <CalendarDays size={16} />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    aria-label="Filter activities by date"
                  />
                </div>
              </div>
            </div>

            <div className="system-activity-log-table-info">
              <span>
                {filteredActivities.length}{" "}
                {filteredActivities.length === 1 ? "activity" : "activities"} found
              </span>

              {hasActiveFilters && (
                <button
                  type="button"
                  className="system-activity-log-clear-button"
                  onClick={clearFilters}
                >
                  <X size={14} />
                  Clear Filters
                </button>
              )}
            </div>

            <div className="system-activity-log-table-wrapper">
              <table className="system-activity-log-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Action</th>
                    <th>Module</th>
                    <th>Details</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td>
                        <div className="system-activity-log-user">
                          <div className="system-activity-log-avatar">
                            {getInitials(activity.user)}
                          </div>

                          <div>
                            <strong>{activity.user}</strong>
                            <span>{activity.role}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`system-activity-log-action ${activity.actionType}`}
                        >
                          {activity.action}
                        </span>
                      </td>

                      <td>
                        <span className="system-activity-log-module">
                          {activity.module}
                        </span>
                      </td>

                      <td>
                        <p className="system-activity-log-details">
                          {activity.details}
                        </p>
                      </td>

                      <td>
                        <div className="system-activity-log-datetime">
                          <strong>{formatDate(activity.date)}</strong>
                          <span>{formatTime(activity.time)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredActivities.length === 0 && (
                <div className="system-activity-log-empty">
                  <div className="system-activity-log-empty-icon">
                    <History size={25} />
                  </div>

                  <h3>No activities found</h3>
                  <p>
                    Try changing your search term or selected filters.
                  </p>
                </div>
              )}
            </div>

            <div className="system-activity-log-footer">
              <span>
                Showing {filteredActivities.length} of {activities.length} records
              </span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ActivityLog;
