// src/components/RecordsSection.jsx
import { useEffect, useState } from "react";
import initSqlJs from "sql.js";

function RecordsSection() {
  const [db, setDb] = useState(null);
  const [ready, setReady] = useState(false);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ first: "", last: "", phone: "" });

  useEffect(() => {
    let mounted = true;

    initSqlJs({
      locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`,
    }).then((SQL) => {
      if (!mounted) return;

      const saved = localStorage.getItem("sqlite-db");
      let database;

      if (saved) {
        database = new SQL.Database(new Uint8Array(JSON.parse(saved)));
      } else {
        database = new SQL.Database();
        database.run(`
          CREATE TABLE entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first TEXT,
            last TEXT,
            phone TEXT
          );
        `);
      }

      setDb(database);
      setReady(true);

      const res = database.exec("SELECT first, last, phone FROM entries ORDER BY id DESC");
      setRows(res.length ? res[0].values : []);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const refreshRows = (database) => {
    const res = database.exec("SELECT first, last, phone FROM entries ORDER BY id DESC");
    setRows(res.length ? res[0].values : []);
  };

  const saveDb = (database) => {
    localStorage.setItem("sqlite-db", JSON.stringify(Array.from(database.export())));
  };

  const handleSave = () => {
    if (!ready || !db) return;
    const { first, last, phone } = form;

    if (!first.trim() || !last.trim() || !phone.trim()) {
      alert("Fill all fields!");
      return;
    }

    db.run("INSERT INTO entries (first, last, phone) VALUES (?, ?, ?)", [
      first.trim(),
      last.trim(),
      phone.trim(),
    ]);

    saveDb(db);
    refreshRows(db);
    setForm({ first: "", last: "", phone: "" });
  };

  const handleClear = () => {
    if (!db) return;
    if (!window.confirm("Clear all saved data?")) return;

    localStorage.removeItem("sqlite-db");
    db.run("DROP TABLE IF EXISTS entries;");
    db.run(`
      CREATE TABLE entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first TEXT,
        last TEXT,
        phone TEXT
      );
    `);

    saveDb(db);
    refreshRows(db);
  };

  return (
    <div className="records-section">
      <h2>Corner Brook Garbage Routes</h2>

      <div className="form-row">
        <label>
          First Name
          <input
            value={form.first}
            onChange={(e) => setForm({ ...form, first: e.target.value })}
          />
        </label>

        <label>
          Last Name
          <input
            value={form.last}
            onChange={(e) => setForm({ ...form, last: e.target.value })}
          />
        </label>

        <label>
          Phone Number
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </label>
      </div>

      <div className="button-row">
        <button className="save" onClick={handleSave}>Save</button>
        <button className="clear" onClick={handleClear}>Clear All Data</button>
      </div>

      {!rows.length ? (
        <p>No saved records.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First</th>
              <th>Last</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecordsSection;