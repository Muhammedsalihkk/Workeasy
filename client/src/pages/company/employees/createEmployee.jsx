import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register_employee } from "../../../store/slices/Slice/userSlice/EmployeeRegister";

function CreateEmployee({ data }) {
  const asModal = data?.asModal === true;
  const { setShowAddModal, showAddModal = true } = data || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    img: "",
    employee_id: "",
    dob: "",
    shift: {
      type: "",
      startTime: "",
      endTime: "",
    },
    join_date: new Date().toISOString().split("T")[0],
    name: "",
    gender: "",
    password: "",
    confirm_password: "",
    email: "",
    number: "",
    company_role: "",
    department: "",
    status: "active",
    qualification: "",
    Address: {
      place: "",
      pin: "",
      distct: "",
      state: "",
    },
  });

  useEffect(() => {
    if (!asModal || !showAddModal) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowAddModal?.(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [asModal, showAddModal, setShowAddModal]);

  useEffect(() => {
    if (!asModal || !showAddModal) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [asModal, showAddModal]);

  const onChangeForm = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const onChangeAddress = (field, value) =>
    setFormData((prev) => ({
      ...prev,
      Address: { ...prev.Address, [field]: value },
    }));

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    if (formData.password !== formData.confirm_password) {
      setSubmitError("Password and Confirm Password do not match");
      setSubmitting(false);
      return;
    }

    try {
      const payload = { ...formData };

      if (payload.company_role === "Admin") {
        delete payload.department;
        delete payload.shift;
      }

      if (payload.Address) {
        const { place, pin, distct, state } = payload.Address;
        const allEmpty =
          (place === "" || place === undefined) &&
          (pin === "" || pin === undefined) &&
          (distct === "" || distct === undefined) &&
          (state === "" || state === undefined);
        if (allEmpty) {
          delete payload.Address;
        }
      }

      await dispatch(register_employee(payload)).unwrap();

      if (asModal) {
        setShowAddModal?.(false);
      } else {
        navigate(-1);
      }

      if (data?.onEmployeeCreated) {
        data.onEmployeeCreated();
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        (typeof err === "string" ? err : "Failed to add employee");
      setSubmitError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const formContent = useMemo(
    () => (
      <form
        onSubmit={handleCreateEmployee}
        className="px-4 sm:px-6 py-5 grid grid-cols-1 gap-4"
      >
        {submitError && (
          <div className="px-3 py-2 rounded bg-red-50 text-red-700 text-sm border border-red-200">
            {submitError}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Full Name</label>
            <input
              value={formData.name}
              onChange={(e) => onChangeForm("name", e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onChangeForm("email", e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="john@company.com"
            />
          </div>
        </div>

        {formData.company_role === "Employee" && (
          <div>
            <label className="block text-sm text-gray-700 mb-1">Employee ID</label>
            <input
              value={formData.employee_id}
              onChange={(e) => onChangeForm("employee_id", e.target.value)}
              required={formData.company_role === "Employee"}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="EMP-001"
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Phone</label>
            <input
              value={formData.number}
              onChange={(e) => onChangeForm("number", e.target.value)}
              required
              inputMode="numeric"
              pattern="^[6-9]\d{9}$"
              maxLength={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="9876543210"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => onChangeForm("gender", e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Role</label>
            <select
              value={formData.company_role}
              onChange={(e) => onChangeForm("company_role", e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          {formData.company_role === "Employee" && (
            <div>
              <label className="block text-sm text-gray-700 mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => onChangeForm("department", e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select</option>
                <option value="StockDepartment">Stock Department</option>
                <option value="SalesDepartment">Sales Department</option>
                <option value="HR">HR</option>
                <option value="Purchase">Purchase</option>
                <option value="Inventory">Inventory</option>
                <option value="Accounts">Accounts</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => onChangeForm("status", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">DOB</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => onChangeForm("dob", e.target.value)}
              required={formData.company_role === "Employee"}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Join Date</label>
            <input
              type="date"
              value={formData.join_date}
              onChange={(e) => onChangeForm("join_date", e.target.value)}
              required={formData.company_role === "Employee"}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {formData.company_role === "Employee" ? (
            <div className="grid grid-cols-1 gap-2">
              <label className="block text-sm text-gray-700 mb-1">Shift</label>
              <select
                value={formData.shift.type}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    shift: { ...prev.shift, type: e.target.value },
                  }))
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select type</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
                <option value="Flexible">Flexible</option>
              </select>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="time"
                  value={formData.shift.startTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      shift: { ...prev.shift, startTime: e.target.value },
                    }))
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="time"
                  value={formData.shift.endTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      shift: { ...prev.shift, endTime: e.target.value },
                    }))
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm text-gray-700 mb-1">Shift</label>
              <input
                value="Not required for Admin"
                disabled
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Qualification</label>
          <input
            value={formData.qualification}
            onChange={(e) => onChangeForm("qualification", e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Degree / Diploma"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => onChangeForm("password", e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Password"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={formData.confirm_password}
              onChange={(e) => onChangeForm("confirm_password", e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Confirm Password"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Place</label>
            <input
              value={formData.Address.place}
              onChange={(e) => onChangeAddress("place", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="City/Town"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">PIN</label>
            <input
              value={formData.Address.pin}
              onChange={(e) => onChangeAddress("pin", Number(e.target.value))}
              inputMode="numeric"
              pattern="^\d{6}$"
              maxLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="560001"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">District</label>
            <input
              value={formData.Address.distct}
              onChange={(e) => onChangeAddress("distct", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">State</label>
            <input
              value={formData.Address.state}
              onChange={(e) => onChangeAddress("state", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          {asModal ? (
            <button
              type="button"
              disabled={submitting}
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              disabled={submitting}
              onClick={() => window.history.back()}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
            >
              Back
            </button>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={`px-4 py-2 rounded-lg text-white ${
              submitting ? "bg-blue-400" : "bg-blue-600"
            }`}
          >
            {submitting ? "Saving..." : "Save Employee"}
          </button>
        </div>
      </form>
    ),
    [submitError, formData, submitting]
  );

  if (asModal) {
    if (!showAddModal) return null;
    return (
      <div
        className="ml-0 lg:ml-64 fixed inset-0 z-50 flex items-center justify-center"
        aria-modal="true"
        role="dialog"
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setShowAddModal?.(false)}
        />
        <div
          className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-white rounded-t-xl">
            <h3 className="text-lg font-semibold">Create Employee</h3>
            <button
              type="button"
              onClick={() => setShowAddModal?.(false)}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700"
            >
              Close
            </button>
          </div>
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl w-full mx-auto ml-0 lg:ml-64 px-4 sm:px-6">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-xl font-semibold">Create Employee</h1>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700"
        >
          Back
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border">
        {formContent}
      </div>
    </div>
  );
}

export default CreateEmployee;
