// Tipos do banco. Escrito à mão para o setup inicial; depois de ligar o
// projeto Supabase, regenere com: npm run db:types

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      perfis: {
        Row: { id: string; nome: string | null; is_admin: boolean; created_at: string }
        Insert: { id: string; nome?: string | null; is_admin?: boolean; created_at?: string }
        Update: { id?: string; nome?: string | null; is_admin?: boolean; created_at?: string }
        Relationships: []
      }
      leads: {
        Row: {
          id: string
          created_at: string
          nome: string
          email: string
          telefone: string | null
          interesse: string
          mensagem: string | null
          origem: string | null
          consentimento_lgpd: boolean
          consentimento_em: string
        }
        Insert: {
          id?: string
          created_at?: string
          nome: string
          email: string
          telefone?: string | null
          interesse?: string
          mensagem?: string | null
          origem?: string | null
          consentimento_lgpd: boolean
          consentimento_em?: string
        }
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
        Relationships: []
      }
      pedidos: {
        Row: {
          id: string
          created_at: string
          data: string
          canal: string
          regiao: string
          categoria: string
          valor: number
          cliente_novo: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          data: string
          canal: string
          regiao: string
          categoria: string
          valor: number
          cliente_novo?: boolean
        }
        Update: Partial<Database['public']['Tables']['pedidos']['Insert']>
        Relationships: []
      }
    }
    Views: {
      kpi_mensal: {
        Row: {
          mes: string | null
          pedidos: number | null
          receita: number | null
          ticket_medio: number | null
          clientes_novos: number | null
        }
        Relationships: []
      }
      vendas_mes_canal: {
        Row: { mes: string | null; canal: string | null; pedidos: number | null; receita: number | null }
        Relationships: []
      }
      vendas_mes_categoria: {
        Row: { mes: string | null; categoria: string | null; pedidos: number | null; receita: number | null }
        Relationships: []
      }
    }
    Functions: {
      is_admin: { Args: Record<PropertyKey, never>; Returns: boolean }
    }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}
