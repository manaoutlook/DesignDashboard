// Thai translations
export const thTranslations = {
  common: {
    language: 'ภาษา',
    dashboard: 'แดชบอร์ด',
    locations: 'สถานที่',
    cars: 'รถยนต์',
    spareParts: 'อะไหล่',
    overview: 'ภาพรวม',
    revenue: 'รายได้',
    activities: 'กิจกรรม',
    settings: 'การตั้งค่า',
    loading: 'กำลังโหลด...',
    error: 'ข้อผิดพลาด',
    success: 'สำเร็จ',
    notifications: 'การแจ้งเตือน',
    users: 'ผู้ใช้',
    name: 'ชื่อ',
    email: 'อีเมล',
    status: 'สถานะ',
    lastActive: 'ใช้งานล่าสุด',
    status_active: 'ใช้งาน',
    status_inactive: 'ไม่ใช้งาน',
  },
  dashboard: {
    title: 'แดชบอร์ด',
    welcome: 'ยินดีต้อนรับสู่แดชบอร์ดองค์กร',
    metrics: {
      totalRevenue: 'รายได้รวม',
      monthlyRevenue: 'รายได้ต่อเดือน',
      activeUsers: 'ผู้ใช้งานปัจจุบัน',
      totalSales: 'ยอดขายรวม',
      activeNow: 'ผู้ใช้งานขณะนี้',
      realtimeUsers: 'ผู้ใช้งานเรียลไทม์',
      fromLastMonth: 'จากเดือนที่แล้ว',
      percentageIncrease: 'เพิ่มขึ้น {{value}}%',
      percentageDecrease: 'ลดลง {{value}}%',
    },
    charts: {
      revenueOverTime: 'รายได้ตามช่วงเวลา',
      monthlySales: 'ยอดขายรายเดือน',
      dailyActive: 'ผู้ใช้งานรายวัน',
    },
    activity: {
      recentActivity: 'กิจกรรมล่าสุด',
      userActions: {
        'created a new project': 'สร้างโปรเจกต์ใหม่',
        'uploaded new files': 'อัปโหลดไฟล์ใหม่',
        'completed task': 'ทำงานเสร็จสิ้น',
      },
      timeLabels: {
        now: 'เมื่อสักครู่',
        minutesAgo: '{{count}} นาทีที่แล้ว',
        hoursAgo: '{{count}} ชั่วโมงที่แล้ว',
        daysAgo: '{{count}} วันที่แล้ว',
      },
    },
  },
  locations: {
    title: 'สถานที่',
    addLocation: 'เพิ่มสถานที่',
    locationDetails: 'รายละเอียดสถานที่',
    address: 'ที่อยู่',
    type: 'ประเภท',
    capacity: 'ความจุ',
    status: 'สถานะ',
    manager: 'ผู้จัดการ',
    contact: 'ติดต่อ',
  },
  cars: {
    title: 'รถยนต์',
    addCar: 'เพิ่มรถยนต์',
    carDetails: 'รายละเอียดรถยนต์',
    vinNumber: 'หมายเลข VIN',
    manufacturer: 'ผู้ผลิต',
    model: 'รุ่น',
    year: 'ปี',
    status: 'สถานะ',
    lastService: 'การซ่อมบำรุงครั้งล่าสุด',
    nextService: 'การซ่อมบำรุงครั้งถัดไป',
    mileage: 'ระยะทาง',
  },
  spareParts: {
    title: 'อะไหล่',
    addPart: 'เพิ่มอะไหล่',
    description: 'จัดการสินค้าคงคลังอะไหล่ทั้งหมดของคุณ',
    listDescription: 'รายการอะไหล่ทั้งหมดในคลังสินค้าของคุณ',
    partNumber: 'หมายเลขอะไหล่',
    name: 'ชื่อ',
    manufacturer: 'ผู้ผลิต',
    price: 'ราคา',
    quantity: 'จำนวน',
    alertThreshold: 'เกณฑ์การแจ้งเตือน',
    location: 'ตำแหน่ง',
    status: {
      inStock: 'มีสินค้า',
      lowStock: 'สินค้าใกล้หมด',
      outOfStock: 'สินค้าหมด',
    },
    alerts: {
      lowStockWarning: 'เตือนสินค้าใกล้หมด',
      reorderPoint: 'ถึงจุดสั่งซื้อใหม่',
    },
  },
  actions: {
    add: 'เพิ่ม',
    edit: 'แก้ไข',
    delete: 'ลบ',
    save: 'บันทึก',
    cancel: 'ยกเลิก',
    confirm: 'ยืนยัน',
    search: 'ค้นหา',
    filter: 'กรอง',
    sort: 'เรียงลำดับ',
    export: 'ส่งออก',
    import: 'นำเข้า',
  },
};