<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BenefitNotification extends Notification
{
    use Queueable;

    protected $title;
    protected $message;
    protected $actionUrl;

    public function __construct(string $title, string $message, string $actionUrl = '#')
    {
        $this->title = $title;
        $this->message = $message;
        $this->actionUrl = $actionUrl;
    }

    // Tell Laravel to save this notification directly into our new database table
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    // Define the exact schema package that will be saved into the data column
    public function toArray(object $notifiable): array
    {
        return [
            'title' => $this->title,
            'message' => $this->message,
            'action_url' => $this->actionUrl,
        ];
    }
}
