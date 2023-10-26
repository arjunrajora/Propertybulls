import React from "react";

import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
export default function Dashboard() {
  return (
    <div>
      <AdminHeader />

      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body">Category</div>
        </div>
      </div>

      <AdminFooter />
    </div>
  );
}
