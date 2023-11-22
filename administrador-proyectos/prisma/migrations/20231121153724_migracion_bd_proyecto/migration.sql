-- CreateTable
CREATE TABLE "Proyecto" (
    "ProyectoId" SERIAL NOT NULL,
    "ProyectoNombre" TEXT NOT NULL,
    "ProyectoCompletado" BOOLEAN NOT NULL DEFAULT false,
    "DefaultActivo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Proyecto_pkey" PRIMARY KEY ("ProyectoId")
);

-- CreateTable
CREATE TABLE "Tareas" (
    "TareasId" SERIAL NOT NULL,
    "TareasNombre" TEXT NOT NULL,
    "TareasCompletada" BOOLEAN NOT NULL DEFAULT false,
    "TareasDescripcion" TEXT,
    "title" VARCHAR(255) NOT NULL,
    "proyectoid" INTEGER,

    CONSTRAINT "Tareas_pkey" PRIMARY KEY ("TareasId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Proyecto_ProyectoNombre_key" ON "Proyecto"("ProyectoNombre");

-- CreateIndex
CREATE UNIQUE INDEX "Tareas_TareasNombre_key" ON "Tareas"("TareasNombre");

-- AddForeignKey
ALTER TABLE "Tareas" ADD CONSTRAINT "Tareas_proyectoid_fkey" FOREIGN KEY ("proyectoid") REFERENCES "Proyecto"("ProyectoId") ON DELETE SET NULL ON UPDATE CASCADE;
