export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      attribute_definitions: {
        Row: {
          category_id: string | null
          created_at: string
          data_type: string
          id: string
          is_comparable: boolean
          is_filterable: boolean
          key: string
          label: string
          options: Json
          sort_order: number
          unit: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          data_type: string
          id?: string
          is_comparable?: boolean
          is_filterable?: boolean
          key: string
          label: string
          options?: Json
          sort_order?: number
          unit?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          data_type?: string
          id?: string
          is_comparable?: boolean
          is_filterable?: boolean
          key?: string
          label?: string
          options?: Json
          sort_order?: number
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attribute_definitions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          after_data: Json | null
          before_data: Json | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: number
          ip_hash: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          after_data?: Json | null
          before_data?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: number
          ip_hash?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          after_data?: Json | null
          before_data?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: number
          ip_hash?: string | null
        }
        Relationships: []
      }
      brands: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          slug: string
          updated_at: string
          visual_world: Json
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          slug: string
          updated_at?: string
          visual_world?: Json
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          updated_at?: string
          visual_world?: Json
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          added_at: string
          cart_id: string
          quantity: number
          unit_price_snapshot: number | null
          variant_id: string
        }
        Insert: {
          added_at?: string
          cart_id: string
          quantity: number
          unit_price_snapshot?: number | null
          variant_id: string
        }
        Update: {
          added_at?: string
          cart_id?: string
          quantity?: number
          unit_price_snapshot?: number | null
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          converted_order_id: string | null
          created_at: string
          currency: string
          guest_token: string | null
          id: string
          last_activity_at: string
          status: Database["public"]["Enums"]["cart_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          converted_order_id?: string | null
          created_at?: string
          currency?: string
          guest_token?: string | null
          id?: string
          last_activity_at?: string
          status?: Database["public"]["Enums"]["cart_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          converted_order_id?: string | null
          created_at?: string
          currency?: string
          guest_token?: string | null
          id?: string
          last_activity_at?: string
          status?: Database["public"]["Enums"]["cart_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "carts_converted_order_fk"
            columns: ["converted_order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          parent_id: string | null
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_addresses: {
        Row: {
          address_line: string
          city: string
          created_at: string
          id: string
          is_default: boolean
          latitude: number | null
          longitude: number | null
          phone: string
          postal_code: string | null
          province: string
          recipient_name: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address_line: string
          city: string
          created_at?: string
          id?: string
          is_default?: boolean
          latitude?: number | null
          longitude?: number | null
          phone: string
          postal_code?: string | null
          province: string
          recipient_name: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address_line?: string
          city?: string
          created_at?: string
          id?: string
          is_default?: boolean
          latitude?: number | null
          longitude?: number | null
          phone?: string
          postal_code?: string | null
          province?: string
          recipient_name?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      health_checks: {
        Row: {
          category: string
          created_at: string
          details: Json
          id: string
          key: string
          label: string
          last_checked_at: string | null
          status: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category: string
          created_at?: string
          details?: Json
          id?: string
          key: string
          label: string
          last_checked_at?: string | null
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          details?: Json
          id?: string
          key?: string
          label?: string
          last_checked_at?: string | null
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      import_batches: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by: string | null
          error_summary: string | null
          id: string
          source_name: string | null
          source_type: string
          source_url: string | null
          started_at: string | null
          stats: Json
          status: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          error_summary?: string | null
          id?: string
          source_name?: string | null
          source_type: string
          source_url?: string | null
          started_at?: string | null
          stats?: Json
          status?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          error_summary?: string | null
          id?: string
          source_name?: string | null
          source_type?: string
          source_url?: string | null
          started_at?: string | null
          stats?: Json
          status?: string
        }
        Relationships: []
      }
      import_items: {
        Row: {
          batch_id: string
          created_at: string
          duplicate_product_id: string | null
          errors: Json
          id: string
          normalized_payload: Json
          product_id: string | null
          source_identifier: string | null
          source_payload: Json
          status: string
          updated_at: string
        }
        Insert: {
          batch_id: string
          created_at?: string
          duplicate_product_id?: string | null
          errors?: Json
          id?: string
          normalized_payload?: Json
          product_id?: string | null
          source_identifier?: string | null
          source_payload?: Json
          status?: string
          updated_at?: string
        }
        Update: {
          batch_id?: string
          created_at?: string
          duplicate_product_id?: string | null
          errors?: Json
          id?: string
          normalized_payload?: Json
          product_id?: string | null
          source_identifier?: string | null
          source_payload?: Json
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "import_items_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "import_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_items_duplicate_product_id_fkey"
            columns: ["duplicate_product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_configs: {
        Row: {
          category: string
          enabled: boolean
          id: string
          provider: string
          public_config: Json
          secret_reference: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category: string
          enabled?: boolean
          id?: string
          provider: string
          public_config?: Json
          secret_reference?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string
          enabled?: boolean
          id?: string
          provider?: string
          public_config?: Json
          secret_reference?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      inventory_locations: {
        Row: {
          code: string
          created_at: string
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      inventory_stock: {
        Row: {
          location_id: string
          quantity_on_hand: number
          quantity_reserved: number
          reorder_level: number
          updated_at: string
          variant_id: string
        }
        Insert: {
          location_id: string
          quantity_on_hand?: number
          quantity_reserved?: number
          reorder_level?: number
          updated_at?: string
          variant_id: string
        }
        Update: {
          location_id?: string
          quantity_on_hand?: number
          quantity_reserved?: number
          reorder_level?: number
          updated_at?: string
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_stock_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "inventory_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_stock_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          id: string
          line_total: number
          order_id: string
          product_name_snapshot: string
          quantity: number
          sku_snapshot: string | null
          unit_price: number
          variant_id: string | null
          variant_title_snapshot: string | null
        }
        Insert: {
          id?: string
          line_total: number
          order_id: string
          product_name_snapshot: string
          quantity: number
          sku_snapshot?: string | null
          unit_price: number
          variant_id?: string | null
          variant_title_snapshot?: string | null
        }
        Update: {
          id?: string
          line_total?: number
          order_id?: string
          product_name_snapshot?: string
          quantity?: number
          sku_snapshot?: string | null
          unit_price?: number
          variant_id?: string | null
          variant_title_snapshot?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      order_status_history: {
        Row: {
          changed_by: string | null
          created_at: string
          from_status: Database["public"]["Enums"]["order_status"] | null
          id: number
          order_id: string
          reason: string | null
          to_status: Database["public"]["Enums"]["order_status"]
        }
        Insert: {
          changed_by?: string | null
          created_at?: string
          from_status?: Database["public"]["Enums"]["order_status"] | null
          id?: number
          order_id: string
          reason?: string | null
          to_status: Database["public"]["Enums"]["order_status"]
        }
        Update: {
          changed_by?: string | null
          created_at?: string
          from_status?: Database["public"]["Enums"]["order_status"] | null
          id?: number
          order_id?: string
          reason?: string | null
          to_status?: Database["public"]["Enums"]["order_status"]
        }
        Relationships: [
          {
            foreignKeyName: "order_status_history_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          address_line: string
          city: string
          created_at: string
          created_by: string | null
          currency: string
          discount_amount: number
          id: string
          notes: string | null
          order_number: number
          postal_code: string | null
          province: string
          recipient_name: string
          recipient_phone: string
          shipping_amount: number
          source: string
          status: Database["public"]["Enums"]["order_status"]
          subtotal_amount: number
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address_line: string
          city: string
          created_at?: string
          created_by?: string | null
          currency?: string
          discount_amount?: number
          id?: string
          notes?: string | null
          order_number?: never
          postal_code?: string | null
          province: string
          recipient_name: string
          recipient_phone: string
          shipping_amount?: number
          source?: string
          status?: Database["public"]["Enums"]["order_status"]
          subtotal_amount?: number
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address_line?: string
          city?: string
          created_at?: string
          created_by?: string | null
          currency?: string
          discount_amount?: number
          id?: string
          notes?: string | null
          order_number?: never
          postal_code?: string | null
          province?: string
          recipient_name?: string
          recipient_phone?: string
          shipping_amount?: number
          source?: string
          status?: Database["public"]["Enums"]["order_status"]
          subtotal_amount?: number
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payment_attempts: {
        Row: {
          amount: number
          authority: string | null
          completed_at: string | null
          failure_code: string | null
          failure_message: string | null
          id: string
          order_id: string
          provider: string
          provider_reference: string | null
          raw_meta: Json
          started_at: string
          status: Database["public"]["Enums"]["payment_status"]
        }
        Insert: {
          amount: number
          authority?: string | null
          completed_at?: string | null
          failure_code?: string | null
          failure_message?: string | null
          id?: string
          order_id: string
          provider: string
          provider_reference?: string | null
          raw_meta?: Json
          started_at?: string
          status?: Database["public"]["Enums"]["payment_status"]
        }
        Update: {
          amount?: number
          authority?: string | null
          completed_at?: string | null
          failure_code?: string | null
          failure_message?: string | null
          id?: string
          order_id?: string
          provider?: string
          provider_reference?: string | null
          raw_meta?: Json
          started_at?: string
          status?: Database["public"]["Enums"]["payment_status"]
        }
        Relationships: [
          {
            foreignKeyName: "payment_attempts_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      product_media: {
        Row: {
          alt_text: string | null
          created_at: string
          external_url: string | null
          id: string
          is_primary: boolean
          kind: Database["public"]["Enums"]["media_kind"]
          product_id: string
          sort_order: number
          source_url: string | null
          storage_path: string | null
          variant_id: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          external_url?: string | null
          id?: string
          is_primary?: boolean
          kind?: Database["public"]["Enums"]["media_kind"]
          product_id: string
          sort_order?: number
          source_url?: string | null
          storage_path?: string | null
          variant_id?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          external_url?: string | null
          id?: string
          is_primary?: boolean
          kind?: Database["public"]["Enums"]["media_kind"]
          product_id?: string
          sort_order?: number
          source_url?: string | null
          storage_path?: string | null
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_media_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_media_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      product_relations: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          product_id: string
          related_product_id: string
          relation_type: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          product_id: string
          related_product_id: string
          relation_type: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          product_id?: string
          related_product_id?: string
          relation_type?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_relations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_relations_related_product_id_fkey"
            columns: ["related_product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_reviews: {
        Row: {
          admin_note: string | null
          body: string | null
          created_at: string
          id: string
          product_id: string
          rating: number
          status: string
          title: string | null
          updated_at: string
          user_id: string | null
          verified_purchase: boolean
        }
        Insert: {
          admin_note?: string | null
          body?: string | null
          created_at?: string
          id?: string
          product_id: string
          rating: number
          status?: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
          verified_purchase?: boolean
        }
        Update: {
          admin_note?: string | null
          body?: string | null
          created_at?: string
          id?: string
          product_id?: string
          rating?: number
          status?: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
          verified_purchase?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          barcode: string | null
          bundle: string | null
          color: string | null
          created_at: string
          edition: string | null
          id: string
          is_active: boolean
          product_id: string
          region: string | null
          sku: string | null
          storage_gb: number | null
          title: string | null
          updated_at: string
        }
        Insert: {
          barcode?: string | null
          bundle?: string | null
          color?: string | null
          created_at?: string
          edition?: string | null
          id?: string
          is_active?: boolean
          product_id: string
          region?: string | null
          sku?: string | null
          storage_gb?: number | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          barcode?: string | null
          bundle?: string | null
          color?: string | null
          created_at?: string
          edition?: string | null
          id?: string
          is_active?: boolean
          product_id?: string
          region?: string | null
          sku?: string | null
          storage_gb?: number | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand_id: string | null
          canonical_url: string | null
          category_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          generation: string | null
          id: string
          imported_at: string | null
          model: string | null
          name: string
          published_at: string | null
          release_date: string | null
          seo_description: string | null
          seo_title: string | null
          short_description: string | null
          slug: string
          source_name: string | null
          source_url: string | null
          status: Database["public"]["Enums"]["product_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          brand_id?: string | null
          canonical_url?: string | null
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          generation?: string | null
          id?: string
          imported_at?: string | null
          model?: string | null
          name: string
          published_at?: string | null
          release_date?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug: string
          source_name?: string | null
          source_url?: string | null
          status?: Database["public"]["Enums"]["product_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          brand_id?: string | null
          canonical_url?: string | null
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          generation?: string | null
          id?: string
          imported_at?: string | null
          model?: string | null
          name?: string
          published_at?: string | null
          release_date?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug?: string
          source_name?: string | null
          source_url?: string | null
          status?: Database["public"]["Enums"]["product_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          locale: string
          marketing_consent: boolean
          phone: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
          locale?: string
          marketing_consent?: boolean
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          locale?: string
          marketing_consent?: boolean
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          code: string | null
          config: Json
          created_at: string
          discount_type: string
          discount_value: number
          enabled: boolean
          ends_at: string | null
          id: string
          min_order_amount: number | null
          name: string
          starts_at: string | null
          updated_at: string
          usage_limit: number | null
        }
        Insert: {
          code?: string | null
          config?: Json
          created_at?: string
          discount_type: string
          discount_value: number
          enabled?: boolean
          ends_at?: string | null
          id?: string
          min_order_amount?: number | null
          name: string
          starts_at?: string | null
          updated_at?: string
          usage_limit?: number | null
        }
        Update: {
          code?: string | null
          config?: Json
          created_at?: string
          discount_type?: string
          discount_value?: number
          enabled?: boolean
          ends_at?: string | null
          id?: string
          min_order_amount?: number | null
          name?: string
          starts_at?: string | null
          updated_at?: string
          usage_limit?: number | null
        }
        Relationships: []
      }
      seo_redirects: {
        Row: {
          created_at: string
          created_by: string | null
          enabled: boolean
          from_path: string
          id: string
          status_code: number
          to_path: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          from_path: string
          id?: string
          status_code?: number
          to_path: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          from_path?: string
          id?: string
          status_code?: number
          to_path?: string
          updated_at?: string
        }
        Relationships: []
      }
      shipping_methods: {
        Row: {
          code: string
          config: Json
          created_at: string
          enabled: boolean
          fee_amount: number
          free_over_amount: number | null
          id: string
          method_type: string
          name: string
          provider: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          code: string
          config?: Json
          created_at?: string
          enabled?: boolean
          fee_amount?: number
          free_over_amount?: number | null
          id?: string
          method_type?: string
          name: string
          provider?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          code?: string
          config?: Json
          created_at?: string
          enabled?: boolean
          fee_amount?: number
          free_over_amount?: number | null
          id?: string
          method_type?: string
          name?: string
          provider?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      variant_attribute_values: {
        Row: {
          attribute_id: string
          value_boolean: boolean | null
          value_date: string | null
          value_json: Json | null
          value_number: number | null
          value_text: string | null
          variant_id: string
        }
        Insert: {
          attribute_id: string
          value_boolean?: boolean | null
          value_date?: string | null
          value_json?: Json | null
          value_number?: number | null
          value_text?: string | null
          variant_id: string
        }
        Update: {
          attribute_id?: string
          value_boolean?: boolean | null
          value_date?: string | null
          value_json?: Json | null
          value_number?: number | null
          value_text?: string | null
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "variant_attribute_values_attribute_id_fkey"
            columns: ["attribute_id"]
            isOneToOne: false
            referencedRelation: "attribute_definitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variant_attribute_values_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      variant_prices: {
        Row: {
          amount: number
          compare_at_amount: number | null
          created_at: string
          currency: string
          ends_at: string | null
          id: string
          is_active: boolean
          starts_at: string | null
          variant_id: string
        }
        Insert: {
          amount: number
          compare_at_amount?: number | null
          created_at?: string
          currency?: string
          ends_at?: string | null
          id?: string
          is_active?: boolean
          starts_at?: string | null
          variant_id: string
        }
        Update: {
          amount?: number
          compare_at_amount?: number | null
          created_at?: string
          currency?: string
          ends_at?: string | null
          id?: string
          is_active?: boolean
          starts_at?: string | null
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "variant_prices_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "customer" | "staff" | "admin"
      cart_status: "active" | "converted" | "abandoned" | "expired"
      media_kind: "image" | "video" | "document"
      order_status:
        | "pending_payment"
        | "paid"
        | "confirmed"
        | "preparing"
        | "packed"
        | "handed_to_carrier"
        | "shipped"
        | "delivered"
        | "cancelled"
        | "return_requested"
        | "returned"
        | "refunded"
      payment_status:
        | "started"
        | "completed"
        | "failed"
        | "cancelled"
        | "refunded"
        | "partially_refunded"
      product_status:
        | "draft"
        | "review"
        | "seo_review"
        | "published"
        | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["customer", "staff", "admin"],
      cart_status: ["active", "converted", "abandoned", "expired"],
      media_kind: ["image", "video", "document"],
      order_status: [
        "pending_payment",
        "paid",
        "confirmed",
        "preparing",
        "packed",
        "handed_to_carrier",
        "shipped",
        "delivered",
        "cancelled",
        "return_requested",
        "returned",
        "refunded",
      ],
      payment_status: [
        "started",
        "completed",
        "failed",
        "cancelled",
        "refunded",
        "partially_refunded",
      ],
      product_status: [
        "draft",
        "review",
        "seo_review",
        "published",
        "archived",
      ],
    },
  },
} as const

