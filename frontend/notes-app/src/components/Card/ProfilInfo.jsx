import React, { useState } from "react";
import { getInitials } from "../../utils/helper.js";

const ProfilInfo = ({ onLogout, userInfo }) => {
  return (
    userInfo && (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-meidum bg-slate-100">
          {getInitials(userInfo.fullName)}
        </div>

        <div className="">
          <p className="text-sm font-medium">{userInfo.fullName}</p>
          <button
            onClick={onLogout}
            className="text-sm text-size-600 underline"
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfilInfo;
