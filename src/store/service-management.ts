/**
 * Interface représentant un service proposé
 */
export interface ServiceManagement {
    /**
     * Nom du service
     */
    nom: string;
    
    /**
     * Prix du service en CFA
     */
    price: number;
    
    /**
     * Description détaillée du service
     */
    description: string;
    
    /**
     * Indique si le service est actuellement disponible
     */
    isAvailable: boolean;
    
    /**
     * Date de création du service
     */
    CratedAt: string; // Notez que cette propriété semble mal orthographiée ("Crated" au lieu de "Created")
    
    /**
     * Date de dernière mise à jour du service
     */
    updatedAt: string;
    
    /**
     * Identifiant unique du service
     */
    id: string;
  }
  
  export default ServiceManagement;