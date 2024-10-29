// models/types.ts
export interface Employee { 
    employee_id: number;
    org_id: number;
    name: string;
    email: string;
    role: string;
    employee_type: string;
    experience: number;
    lpa: number;
    hourly_rate: number;
    project_id: number;
    project_manager_id: number;
    attendance: Record<string, string>;
  }
  // src/types/jwtPayload.ts (or a preferred location for types)
export interface JwtPayload {
  id: string;
  role: string;
}

  
  export interface Organisation {
    org_id: number;
    name: string;
    type: string;
    address: string;
    contact_info: string;
  }
  
    export interface Project  {
    project_id: number;
    org_id: number;
    client_id: number;
    project_name: string;
    start_date: Date;
    end_date: Date;
    status: string;
    total_budget: number;
    allocated_budget: number;
    remaining_budget: number;
    employee_budget: number;
    technical_budget: number;
    additional_budget: number;
    actual_expenses: number;
    employees_list: number[];
}

export interface Client {
    org_id: number;
    name: string;
    contact_info: string;
}