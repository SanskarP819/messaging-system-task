# Messaging System - Internship Assignment

Full Stack application for managing Email, SMS, and WhatsApp logs with database persistence.

## 🚀 Technologies Used

### Backend
- Spring Boot 3.2.0
- Java 17
- Spring Data JPA
- H2 Database (In-Memory)
- Maven

### Frontend
- React 18
- Tailwind CSS
- Fetch API for HTTP requests

---

## ✨ Features

✅ **Email Logs Tab** - View and send email logs  
✅ **SMS Logs Tab** - View and send SMS logs  
✅ **WhatsApp Logs Tab** - View and send WhatsApp logs  
✅ **Form Submissions** - Add new entries via forms  
✅ **Real-time Updates** - Data refreshes automatically  
✅ **Database Persistence** - All data stored in H2 database  

**Note:** No actual emails, SMS, or WhatsApp messages are sent. Only database entries are created as per assignment requirements.

---



---

## 🛠️ Installation & Setup

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Node.js 16+ and npm
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies and run:
```bash
mvn clean install
mvn spring-boot:run
```

3. Backend will start on: `http://localhost:8080`

4. Access H2 Console (optional):
   - URL: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:messagingdb`
   - Username: `sa`
   - Password: (leave empty)

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

4. Frontend will open at: `http://localhost:3000`

---

## 📡 API Endpoints

### Email Endpoints
- `POST /api/email/send` - Send email (create DB entry)
- `GET /api/email/list` - Get all email logs

### SMS Endpoints
- `POST /api/sms/send` - Send SMS (create DB entry)
- `GET /api/sms/list` - Get all SMS logs

### WhatsApp Endpoints
- `POST /api/whatsapp/send` - Send WhatsApp (create DB entry)
- `GET /api/whatsapp/list` - Get all WhatsApp logs

---

## 🗄️ Database Schema

### EMAIL_LOGS Table
| Column | Type | Description |
|--------|------|-------------|
| id | Long | Primary Key (Auto-increment) |
| email_to | String | Recipient email address |
| timestamp | LocalDateTime | When email was logged |

### SMS_LOGS Table
| Column | Type | Description |
|--------|------|-------------|
| id | Long | Primary Key (Auto-increment) |
| mobile_number | String | Recipient mobile number |
| message | String | SMS message content |
| timestamp | LocalDateTime | When SMS was logged |

### WHATSAPP_LOGS Table
| Column | Type | Description |
|--------|------|-------------|
| id | Long | Primary Key (Auto-increment) |
| mobile_number | String | Recipient mobile number |
| message | String | WhatsApp message content |
| timestamp | LocalDateTime | When message was logged |

---

## 🎯 Assignment Requirements - Completed

- [x] Multiple tabs (Email, SMS, WhatsApp)
- [x] Each tab has list view with different columns
- [x] Email tab shows: Serial No., Email Sent To, Timestamp
- [x] SMS tab shows: Serial No., Mobile Number, Message, Timestamp
- [x] WhatsApp tab shows: Serial No., Mobile Number, Message, Timestamp
- [x] Three separate forms for Email, SMS, and WhatsApp
- [x] Form submissions save to database
- [x] Data displays in respective tab list views
- [x] NO actual messages sent (only DB entries)



---



---

## 🙏 Acknowledgments

Assignment provided by **Vishvena Technologies**  
Submitted to: **Vijay Varma (Head of Operations)**

---

**Thank you for reviewing my submission!** 🚀
```

