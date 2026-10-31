USE bup_lost_found_professional;

-- Safe, additive migration: does not drop or alter existing tables/data.
CREATE TABLE IF NOT EXISTS item_tracking_events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    event_type VARCHAR(40) NOT NULL,
    title VARCHAR(160) NOT NULL,
    description TEXT NOT NULL,
    actor_id INT NULL,
    visibility ENUM('admin','public') NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tracking_item
        FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE,
    CONSTRAINT fk_tracking_actor
        FOREIGN KEY (actor_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_tracking_item_created (item_id, created_at),
    INDEX idx_tracking_event_type (event_type),
    INDEX idx_tracking_created (created_at)
);
