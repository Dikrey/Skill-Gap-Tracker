# API Documentation - Skill Gap Tracker

Base URL: `http://localhost:5000/api`

## 📋 Table of Contents
- [Roles API](#roles-api)
- [Skills API](#skills-api)
- [Analysis API](#analysis-api)
- [Roadmap API](#roadmap-api)
- [Demo API](#demo-api)

---

## 🎯 Roles API

### GET `/api/roles`
Get all job roles

**Response:**
```json
{
  "roles": [
    {
      "id": "uuid",
      "name": "Frontend Developer",
      "description": "Membangun antarmuka pengguna..."
    }
  ]
}
```

---

### GET `/api/roles/:id`
Get single job role by ID

**Parameters:**
- `id` (path) - Role UUID

**Response:**
```json
{
  "role": {
    "id": "uuid",
    "name": "Frontend Developer",
    "description": "Membangun antarmuka pengguna..."
  }
}
```

**Error Responses:**
- `404` - Role not found

---

### GET `/api/roles/:id/skills`
Get all skills required for a specific role

**Parameters:**
- `id` (path) - Role UUID

**Response:**
```json
{
  "role": {
    "id": "uuid",
    "name": "Frontend Developer"
  },
  "skills": {
    "required": [
      {
        "id": "uuid",
        "name": "React.js",
        "category": "programming",
        "importance": "required"
      }
    ],
    "nice_to_have": [
      {
        "id": "uuid",
        "name": "TypeScript",
        "category": "programming",
        "importance": "nice_to_have"
      }
    ],
    "total": 15
  }
}
```

**Error Responses:**
- `404` - Role not found

---

### GET `/api/roles/search?q=frontend`
Search roles by name

**Query Parameters:**
- `q` (required) - Search query

**Response:**
```json
{
  "query": "frontend",
  "count": 3,
  "roles": [
    {
      "id": "uuid",
      "name": "Frontend Developer",
      "description": "..."
    }
  ]
}
```

**Error Responses:**
- `400` - Query parameter "q" is required

---

## 🛠️ Skills API

### GET `/api/skills`
Get all skills with optional filtering

**Query Parameters:**
- `category` (optional) - Filter by category (programming, tools, knowledge, soft_skill)

**Response:**
```json
{
  "skills": [
    {
      "id": "uuid",
      "name": "React.js",
      "category": "programming"
    }
  ],
  "count": 413,
  "category": "programming"
}
```

---

### GET `/api/skills/categories`
Get all unique skill categories

**Response:**
```json
{
  "categories": [
    "programming",
    "tools",
    "knowledge",
    "soft_skill"
  ],
  "count": 4
}
```

---

### GET `/api/skills/:id`
Get single skill by ID with resources

**Parameters:**
- `id` (path) - Skill UUID

**Response:**
```json
{
  "skill": {
    "id": "uuid",
    "name": "React.js",
    "category": "programming"
  },
  "resources": [
    {
      "id": "uuid",
      "title": "React Official Documentation",
      "type": "article",
      "url": "https://react.dev",
      "platform": "Official Documentation"
    }
  ]
}
```

**Error Responses:**
- `404` - Skill not found

---

### GET `/api/skills/:id/resources`
Get learning resources for a specific skill

**Parameters:**
- `id` (path) - Skill UUID

**Response:**
```json
{
  "skill": {
    "id": "uuid",
    "name": "React.js"
  },
  "resources": [
    {
      "id": "uuid",
      "title": "React Official Documentation",
      "type": "article",
      "url": "https://react.dev",
      "platform": "Official Documentation"
    }
  ],
  "byType": {
    "article": [...],
    "video": [...]
  },
  "total": 3
}
```

**Error Responses:**
- `404` - Skill not found

---

### GET `/api/skills/:id/roles`
Get all roles that require this skill

**Parameters:**
- `id` (path) - Skill UUID

**Response:**
```json
{
  "skill": {
    "id": "uuid",
    "name": "React.js"
  },
  "roles": {
    "required": [
      {
        "id": "uuid",
        "name": "Frontend Developer",
        "description": "...",
        "importance": "required"
      }
    ],
    "nice_to_have": [
      {
        "id": "uuid",
        "name": "Full-Stack Developer",
        "description": "...",
        "importance": "nice_to_have"
      }
    ],
    "total": 12
  }
}
```

**Error Responses:**
- `404` - Skill not found

---

### GET `/api/skills/search?q=react`
Search skills by name

**Query Parameters:**
- `q` (required) - Search query

**Response:**
```json
{
  "query": "react",
  "count": 2,
  "skills": [
    {
      "id": "uuid",
      "name": "React.js",
      "category": "programming"
    },
    {
      "id": "uuid",
      "name": "React Native",
      "category": "programming"
    }
  ]
}
```

**Error Responses:**
- `400` - Query parameter "q" is required

---

## 📊 Analysis API

### GET `/api/analysis`
Calculate skill gap and readiness score for authenticated user

**Authentication:** Required (Bearer token)

**Response:**
```json
{
  "targetRole": "Frontend Developer",
  "readinessScore": 75.5,
  "totalRequired": 10,
  "masteredCount": 7,
  "masteredSkills": [
    {
      "id": "uuid",
      "name": "HTML5",
      "category": "programming"
    }
  ],
  "gapSkills": [
    {
      "id": "uuid",
      "name": "TypeScript",
      "category": "programming"
    }
  ],
  "niceToHaveSkills": [
    {
      "id": "uuid",
      "name": "GraphQL",
      "category": "programming"
    }
  ]
}
```

**Error Responses:**
- `400` - Target role belum di-set
- `401` - Unauthorized

---

## 🗺️ Roadmap API

### POST `/api/roadmap`
Generate personalized learning roadmap (authenticated)

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "current_position": "Junior Developer"
}
```

**Response:**
```json
{
  "roadmap": {
    "phases": [
      {
        "phase": 1,
        "title": "Foundation Skills",
        "duration": "2-3 bulan",
        "skills": [
          {
            "name": "HTML5",
            "resources": [...]
          }
        ]
      }
    ]
  }
}
```

---

## 🎮 Demo API

### GET `/api/demo/roles`
Get all roles (no auth required)

**Response:**
```json
{
  "roles": [...]
}
```

---

### GET `/api/demo/skills`
Get all skills (no auth required)

**Response:**
```json
{
  "skills": [...]
}
```

---

### GET `/api/demo/roles/:id/skills`
Get skills for a role (no auth required)

**Response:**
```json
{
  "skills": [...]
}
```

---

### POST `/api/demo/roadmap`
Generate demo roadmap (no auth required)

**Request Body:**
```json
{
  "target_role_id": "uuid",
  "target_role_name": "Frontend Developer",
  "current_position": "Beginner"
}
```

**Response:**
```json
{
  "roadmap": {
    "phases": [...]
  }
}
```

---

## 🔐 Authentication

Most endpoints require authentication using Bearer token:

```
Authorization: Bearer <your-jwt-token>
```

Demo endpoints (`/api/demo/*`) do not require authentication.

---

## 📝 Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "error": "Error message describing what went wrong"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Detailed error message"
}
```

---

## 🧪 Testing Endpoints

### Using cURL

```bash
# Get all roles
curl http://localhost:5000/api/roles

# Get specific role
curl http://localhost:5000/api/roles/{role-id}

# Get skills for a role
curl http://localhost:5000/api/roles/{role-id}/skills

# Search roles
curl "http://localhost:5000/api/roles/search?q=frontend"

# Get all skills
curl http://localhost:5000/api/skills

# Get skills by category
curl "http://localhost:5000/api/skills?category=programming"

# Get skill categories
curl http://localhost:5000/api/skills/categories

# Get specific skill with resources
curl http://localhost:5000/api/skills/{skill-id}

# Get resources for a skill
curl http://localhost:5000/api/skills/{skill-id}/resources

# Get roles that require a skill
curl http://localhost:5000/api/skills/{skill-id}/roles

# Search skills
curl "http://localhost:5000/api/skills/search?q=react"
```

### Using Postman

1. Import the collection (coming soon)
2. Set base URL: `http://localhost:5000/api`
3. For authenticated endpoints, add Bearer token in Authorization header

---

## 📊 Database Statistics

Current dataset (as of April 2026):
- **Job Roles:** 152
- **Skills:** 413
- **Role-Skill Mappings:** 674+
- **Learning Resources:** 484+

---

## 🔄 API Versioning

Current version: `v1` (implicit)

Future versions will be prefixed: `/api/v2/...`

---

**Last Updated:** April 5, 2026  
**Maintained by:** Skill Gap Tracker Team
