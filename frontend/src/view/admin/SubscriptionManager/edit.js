import { useEffect, useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import { Link as RouterLink, useNavigate, useLocation, useParams } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";



export default function PackageEdit() {



  return (
    <div>
      <AdminHeader />


      <AdminFooter />
    </div >
  );
}
