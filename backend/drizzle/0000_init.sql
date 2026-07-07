CREATE TABLE `cars` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`manufacturer` text NOT NULL,
	`model` text NOT NULL,
	`year` integer NOT NULL,
	`registration_number` text NOT NULL,
	`color` text NOT NULL,
	`status` text DEFAULT 'available' NOT NULL,
	`notes` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cars_registration_number_unique` ON `cars` (`registration_number`);