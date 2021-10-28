import React from 'react'

const AdminPanel = () => {
    return (
        <div className="admin_panel">
            <div className="admin_nav">
                <li><button className="admin_panel_button">Kölcsönzések <span>(1)</span></button></li>
                <li><button className="admin_panel_button">Modellek</button></li>
                <li><button className="admin_panel_button">Ajándékbolt</button></li>
                <li><button className="admin_panel_button_logout">Kijelentkezés</button></li>
            </div>
        </div>
    )
}

export default AdminPanel
