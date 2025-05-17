
import React, { useState } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const notifications = [
  {
    id: 1,
    title: "Nova venda realizada",
    description: "Pedido #12345 foi concluído com sucesso.",
    time: "Agora mesmo",
    read: false
  },
  {
    id: 2,
    title: "Novo usuário registrado",
    description: "Gabriela Rocha se cadastrou na plataforma.",
    time: "30 min atrás",
    read: false
  },
  {
    id: 3,
    title: "Produto com estoque baixo",
    description: "Notebook Ultra tem apenas 7 unidades restantes.",
    time: "2 horas atrás",
    read: true
  },
  {
    id: 4,
    title: "Relatório mensal disponível",
    description: "O relatório de abril está pronto para visualização.",
    time: "1 dia atrás",
    read: true
  }
];

const DashboardHeader = () => {
  const { user } = useAuth();
  const [notificationsState, setNotificationsState] = useState(notifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notificationsState.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotificationsState(prev => 
      prev.map(notification => 
        notification.id === id ? {...notification, read: true} : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationsState(prev => 
      prev.map(notification => ({...notification, read: true}))
    );
  };

  return (
    <header className="border-b bg-white dark:bg-gray-950 z-10 sticky top-0">
      <div className="flex items-center h-16 px-4 md:px-6 gap-4">
        <SidebarTrigger />
        <div className="flex">
          <h1 className="text-lg font-medium">Olá, {user?.name || "Usuário"}</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Notificações</h3>
                  <p className="text-sm text-muted-foreground">
                    {unreadCount} não lidas
                  </p>
                </div>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Marcar todas como lidas
                  </Button>
                )}
              </div>
              <div className="max-h-80 overflow-auto">
                {notificationsState.length > 0 ? (
                  <div className="divide-y">
                    {notificationsState.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-4 ${notification.read ? "" : "bg-brand-50"}`}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-5 w-5" 
                              onClick={() => markAsRead(notification.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    Sem notificações
                  </div>
                )}
              </div>
              <div className="p-2 border-t">
                <Button variant="outline" size="sm" className="w-full" onClick={() => setIsOpen(false)}>
                  Ver todas as notificações
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
